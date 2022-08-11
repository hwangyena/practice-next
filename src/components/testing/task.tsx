import React, { memo } from 'react';

type Task = { id: string; title: string; state: 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED'; updatedAt: Date };
type Props = {
  task: Partial<Task>;
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
