import React, { memo, useState } from 'react';

type Props = {
  task: { id: number; title: string; state: string };
  onArchiveTask: () => void;
};

const TestingTask = ({ onArchiveTask, task }: Props) => {
  return (
    <div className="list-item">
      <input type="text" value={task.title} readOnly={true} />
    </div>
  );
};

export default memo(TestingTask);
