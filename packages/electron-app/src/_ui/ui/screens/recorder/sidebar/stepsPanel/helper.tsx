import { ActionsInTestEnum } from "@shared/constants/recordedActions";
import { iAction } from "@shared/types/action";
import { StepErrorTypeEnum } from "runner-utils/src/error.types";
import { SELECTOR_TYPE } from "unique-selector/src/constants";

/*
	A function to replace text within outer brackets, counting the number of brackets
	e.g.
		"Click on [input[type="text"]] [https://google.com]" => "Click on (input[type="text"]) (https://google.com)"
		"Navigate to [https://google.com]" => "Navigate to (https://google.com)"
*/
let parseStepNameText = (text: string): { type: "normal" | "highlight"; value: string }[] => {
	let count = 0;
	let start = 0;
	let end = 0;
	let newText = "";
	let finalArr = [];
	for (let i = 0; i < text.length; i++) {
		if (text[i] === "[") {
			count++;
			if (count === 1) {
				start = i;
				finalArr.push({ type: "normal", value: newText });
				newText = "";
			}
		} else if (text[i] === "]") {
			count--;
			if (count === 0) {
				end = i;
				finalArr.push({ type: "highlight", value: text.substring(start + 1, end) });
			}
		} else if (count === 0) {
			newText += text[i];
		}
	}
	if (count !== 0) {
		finalArr.push({ type: "highlight", value: text.substring(start + 1) });
		newText = "";
	}
	if (newText?.length) {
		finalArr.push({ type: "normal", value: newText });
	}
	return finalArr;
};

const TextHighlighter = ({ text }, shouldStyle = false) => {
	return parseStepNameText(text).map((a) => {
		if (a.type === "highlight") {
			return (
				<span className="highlight-box" style={{ color: shouldStyle ? `rgba(121, 207, 255, 1)` : "auto" }} title={a.value}>
					{a.value.length > 15 ? `${a.value.substring(0, 15)}...` : a.value}
				</span>
			);
		} else {
			return <span title={a.value}>{a.value}</span>;
		}
	});
};

const TextHighlighterText = ({ text }) => {
	return parseStepNameText(text).map((a) => {
		return a.value;
	});
};

const transformStringSelectorsToArray = (selectors: string) => {
	const selectorsArray = selectors.split("\n");
	return selectorsArray.map((selector) => {
		return { type: SELECTOR_TYPE.PLAYWRIGHT, value: selector, uniquenessScore: 1 };
	});
};

const getErrorMessage = (lastFailedStep: iAction) => {
	if(lastFailedStep.errorType === StepErrorTypeEnum.ASSERTIONS_FAILED) {
		if(lastFailedStep.type === ActionsInTestEnum.VALIDATE_SEO) {
			return "SEO assertions failed";
		} else if (lastFailedStep.type === ActionsInTestEnum.ASSERT_ELEMENT) {
			return "Element assertions failed";
		}
		return "assertions failed";
	} else {
		console.log("last failed step", lastFailedStep);
		if([StepErrorTypeEnum.TIMEOUT, StepErrorTypeEnum.ELEMENT_NOT_FOUND, StepErrorTypeEnum.ELEMENT_NOT_STABLE, StepErrorTypeEnum.ELEMENT_NOT_VISIBLE].includes(lastFailedStep.errorType) && lastFailedStep.type.startsWith("ELEMENT_")) {
			return "element info couldn't be found";
		}
		return "unexpected error occurred";
	}
};

export { parseStepNameText, TextHighlighter, transformStringSelectorsToArray, TextHighlighterText, getErrorMessage };
