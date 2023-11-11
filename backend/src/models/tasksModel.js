const connection = require('./connection');

const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

const createTask = async (task) => {
    const { linha, solicitacao } = task;
    const dateUTC = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = 'INSERT INTO tasks(linha, solicitacao, status, created_at) VALUES (?, ?, ?, ?)';
    const [createdTask] = await connection.execute(query, [linha, solicitacao, 'pendente', dateUTC]);

    return { insertId: createdTask.insertId };
};

const deleteTask = async (id)=>{
    const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;

}
const updateTask = async(id,task)=>{
    const{linha,status} = task;
    const updatedTask = await connection.execute('UPDATE tasks SET linha = ?, status = ? WHERE id = ?', [linha, status, id]);
}
module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};