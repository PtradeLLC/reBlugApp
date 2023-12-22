import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

const sampleKey = atom({
    key: "sampleKey",
    default: []
});

const campaignEventState = atom({
    key: "campaignEventState",
    default: "Show All"
});

const filteredTodoListState = selector({
    key: "filteredTodoListState",
    get: ({ get }) => {
        const filter = get(todoListFilterState);
        const list = get(todoListState);

        switch (filter) {
            case "Show Completed":
                return list.filter((item) => item.isComplete);
            case "Show Uncompleted":
                return list.filter((item) => !item.isComplete);
            default:
                return list;
        }
    }
});

const todoListStatsState = selector({
    key: "todoListStatsState",
    get: ({ get }) => {
        const todoList = get(todoListState);
        const totalNum = todoList.length;
        const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
        let allText = "";
        todoList
            .filter((item) => !item.isComplete)
            .map((item) => (allText = allText + " " + item.text));
        const totalUncompletedNum = totalNum - totalCompletedNum;
        const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

        return {
            totalNum,
            totalCompletedNum,
            totalUncompletedNum,
            percentCompleted,
            allText
        };
    }
});

export {
    campaignEventState,
    filteredTodoListState,
    todoListStatsState
};
