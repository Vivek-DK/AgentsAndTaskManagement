const distributeTasks = (tasks, agents) => {
  if (!agents.length) return [];

  const totalTasks = tasks.length;
  const totalAgents = agents.length;

  const baseTasks = Math.floor(totalTasks / totalAgents);
  const remainingTasks = totalTasks % totalAgents;

  let result = [];
  let taskIndex = 0;

  // ✅ Equal distribution first
  for (let i = 0; i < totalAgents; i++) {
    for (let j = 0; j < baseTasks; j++) {
      result.push({
        ...tasks[taskIndex],
        agent: agents[i]._id
      });
      taskIndex++;
    }
  }

  // ✅ Remaining tasks sequentially
  for (let i = 0; i < remainingTasks; i++) {
    result.push({
      ...tasks[taskIndex],
      agent: agents[i]._id
    });
    taskIndex++;
  }

  return result;
};

module.exports = distributeTasks;
