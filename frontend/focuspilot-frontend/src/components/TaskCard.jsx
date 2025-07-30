const TaskCard = ({ task }) => {
    return (
        <div style = {{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{task.title}</h3>
            <p>Status: {task.status}</p>
            <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Nodue date'}</p>
        </div>
    );
};

export default TaskCard;