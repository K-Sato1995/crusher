import axios from "axios";
import chalk from "chalk";
import { Cloudflare } from "../module/cloudflare";
import { getUserInfo } from "../state/userInfo";
import { getLoggedInUser } from "../utils/index";
import {
  resolveBackendServerUrl,
  resolveFrontendServerUrl,
} from "../utils/utils";
import { CI } from "./ci";
import { BlankMessage, Message } from "./cliMessages";
import { getProjectConfig } from "./projectConfig";

const getUserInfoFromToken = async (token: string) => {
  // call axios request with token as cookie header
  const infoResponse = await axios.get(
    resolveBackendServerUrl("/users/actions/getUserAndSystemInfo"),
    {
      headers: {
        Cookie: `isLoggedIn=true; token=${token}`,
      },
    }
  );

  const info = infoResponse.data;
  if (!info.isUserLoggedIn)
    throw new Error(
      "Invalid user authentication. Login again using `npx crusher login` to fix this"
    );

  return {
    id: info.userData.userId,
    teamName: info.team.name,
    name: info.userData.name,
    email: info.userData.email,
    token: token,
  };
};

const getProjectsOfCurrentUser = async (): Promise<
  Array<{ id: number; name: string }>
> => {
  const currentUser = getLoggedInUser();
  const infoResponse = await axios.get(
    resolveBackendServerUrl("/users/actions/getUserAndSystemInfo"),
    {
      headers: {
        Cookie: `isLoggedIn=true; token=${currentUser?.token}`,
      },
    }
  );
  const info = infoResponse.data;

  return info.projects;
};

const getTotalTestsInProject = async (projectId: number): Promise<number> => {
  const userInfo = getLoggedInUser();
  const res = await axios.get(
    resolveBackendServerUrl(`/projects/${projectId}/tests`),
    {
      headers: {
        Cookie: `isLoggedIn=true; token=${userInfo?.token}`,
      },
    }
  );

  return res.data.list.length;
};

const createProject = async (projectName: string) => {
  const userInfo = getLoggedInUser();
  const res = await axios.post(
    resolveBackendServerUrl(`/projects/actions/create`),
    {
      name: projectName,
    },
    {
      headers: {
        Cookie: `isLoggedIn=true; token=${userInfo?.token}`,
      },
    }
  );

  return res.data;
};

const getInviteLink = async (projectId: number) => {
  const userInfo = getLoggedInUser();
  const res = await axios.get(
    resolveBackendServerUrl(`/users/invite.link?projectId=${projectId}`),
    {
      headers: {
        Cookie: `isLoggedIn=true; token=${userInfo?.token}`,
      },
    }
  );

  return res.data;
};

const inviteProjectMembers = async (
  projectId: number,
  emails: Array<string>
) => {
  const userInfo = getLoggedInUser();
  const res = await axios.post(
    resolveBackendServerUrl(`/users/actions/invite.project.members`),
    {
      emails: emails,
      projectId: projectId,
    },
    {
      headers: {
        Cookie: `isLoggedIn=true; token=${userInfo?.token}`,
      },
    }
  );

  return { success: res.data === "Successful" };
};
const getProjectInfo = async (projectId: number): Promise<any> => {
  const projects = await getProjectsOfCurrentUser();
  return projects.find((project) => project.id === projectId);
};

const getContextEnvVariables = () => {
  const env = eval("process.env");
  const crusherContextEnvMap = Object.keys(env).reduce((acc, key) => {
    if (key.startsWith("CRUSHER_")) {
      return { ...acc, [key.substr(8)]: env[key] };
    }
    return { ...acc };
  }, {});

  return crusherContextEnvMap;
};

const getTestIdsArr = (testIds?: string) => {
  if(!testIds) return null;

  return testIds.split(",");
}
const getTestGroupArr = (testGroups?: string) => {
  if(!testGroups) return null;
  return testGroups.split(",");
}


const runTests = async (host: string | undefined, proxyUrlsMap: { [name: string] : {tunnel: string; intercept: any} } = {}, browsers: Array<"CHROME" | "FIREFOX" | "SAFARI"> = ["CHROME"], testIds?: string, testGroups?: string, projectId?: any) => {
  const userInfo = getUserInfo();
  let _projectId = null;

  if (projectId) {
    _projectId = projectId;
    console.log(`Project Id passed in flag, using it: ${projectId}`)
  } else {
    const projectConfig = getProjectConfig();
    _projectId = projectConfig.project;
  }

  Message(chalk.bgMagentaBright.bold, ' cloud  ', `Running tests now`, true);

  try {
    const context = getContextEnvVariables();

    const environmentInfo  = CI.getEnvironmentInfo();
    const res = await axios.post(
      resolveBackendServerUrl(
        `/projects/${_projectId}/tests/actions/run`
      ),
      {
        ...environmentInfo,
        host: host,
        proxyUrlsMap: proxyUrlsMap,
        browsers: browsers,
        context: context,
        testIds: testIds,
        testGroups: testGroups,
      },
      {
        headers: {
          Cookie: `isLoggedIn=true; token=${userInfo?.token}`,
        },
      }
    );

    console.log("");

    const buildInfo = res.data.buildInfo;
    const buildId = buildInfo.buildId;

    BlankMessage(`${chalk.gray("Waiting for tests to finish")}\n `);
    
    // sleep for 20 seconds
    await new Promise((resolve) => {
      // create a poll to check if tests are done
      const poll = setInterval(async () => {
        const res = await axios.get(
          resolveBackendServerUrl(
            `/projects/${_projectId}/builds?buildId=${buildId}`
          ),
          {
            headers: {
              Cookie: `isLoggedIn=true; token=${userInfo?.token}`,
            },
          }
        );

        const buildInfo = res.data.list[0];
        if (
          buildInfo.status === "PASSED" ||
          buildInfo.status === "FAILED" ||
          buildInfo.status === "MANUAL_REVIEW_REQUIRED"
        ) {
          clearInterval(poll);
          
          Message(
            chalk.bgGreenBright.bold, ' report  ', 
            buildInfo.status === "PASSED"
              ? `Build passed in ${parseInt(buildInfo.duration)}s`
              : `Build failed in ${parseInt(buildInfo.duration)}s`,
              true
          );
          BlankMessage(
            " View build report at " +
              resolveFrontendServerUrl(`/app/build/${buildId}`)
          );
          resolve(true);
        }
      }, 5000);
    });
  } catch (err: any) {
    console.error(err);
    console.error(err.message);
  }
};

export {
  inviteProjectMembers,
  getInviteLink,
  getUserInfoFromToken,
  getProjectsOfCurrentUser,
  runTests,
  getTotalTestsInProject,
  getProjectInfo,
  createProject,
};
