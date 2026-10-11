/**
 * 供界面开发用的假用户状态（第 1–3 步已填）
 * 明显示例数据，非真实案例分析结论。
 */
(function () {
  window.MOCK_USER_STATE = {
    stateVersion: "1.0",
    caseId: "fukushima",
    currentStep: 3,
    startedAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T01:00:00.000Z",
    steps: {
      "1": {
        completed: true,
        revisedAt: "2025-01-01T00:20:00.000Z",
        fields: {
          issues: [
            {
              text: "【示例】某主体在某某决策中是否应当优先考虑 A 而非 B？",
              actor: "【示例】角色甲"
            },
            {
              text: "【示例】某机构是否应该公开某类信息？",
              actor: ""
            },
            {
              text: "【示例】个人责任与组织责任在此情境下该如何划分？",
              actor: "【示例】角色乙"
            },
            {
              text: "【示例】在资源有限时，是否应当先执行措施 X？",
              actor: ""
            },
            {
              text: "【示例】合规是否等同于满足最低安全标准？",
              actor: "【示例】角色丙"
            }
          ]
        }
      },
      "2": {
        completed: true,
        revisedAt: "2025-01-01T00:40:00.000Z",
        fields: {
          chosen: ["issue-0", "issue-1"],
          reason: "【示例】选取两条以覆盖决策与信息披露两个子问题，便于后续事实与原则分析。"
        }
      },
      "3": {
        completed: false,
        fields: {
          relatedFacts: {
            material: [
              "【示例】材料/环境类占位事实 1",
              "【示例】材料/环境类占位事实 2"
            ],
            individual: [
              "【示例】个人/行为类占位事实 1",
              "【示例】个人/行为类占位事实 2"
            ],
            organization: [
              "【示例】组织/制度类占位事实 1",
              "【示例】组织/制度类占位事实 2"
            ],
            missing: ["【示例】尚缺的关键事实 1", "【示例】尚缺的关键事实 2"]
          }
        }
      }
    }
  };
})();
