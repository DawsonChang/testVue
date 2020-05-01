import BudgetsGraph from "@/components/BudgetsGraph";
import { mount } from "@vue/test-utils";

describe("BudgetsGraph", () => {
  test("By default, budget title shoud be ''", () => {
    const wrapper = mount(BudgetsGraph, {
      propsData: {
        budget: {
          title: "Budget Today",
          budgets: [0, 20, 100, 300, 520, 200, 0],
          color: "cyan",
          labels: ["0AM", "4AM", "8AM", "12AM", "4PM", "8PM", "0AM"],
        },
      },
    });
    expect(wrapper.html()).toContain('<v-card color="cyan" dark="">');
  });
});
