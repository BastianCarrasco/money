import db from "./comandos.js";

export const createUser = (nome) => {
    const stmt = db.prepare("INSERT INTO usuarios (nome) VALUES (?)");
    const info = stmt.run(nome);
    return info.lastInsertRowid; // Devuelve el ID insertado
  };
  
  // 📌 Obtener todos los usuarios
  export const getUsers = () => {
    const stmt = db.prepare("SELECT * FROM usuarios");
    return stmt.all();
  };
  
  // 📌 Obtener un usuario por ID
  export const getUserById = (id) => {
    const stmt = db.prepare("SELECT * FROM usuarios WHERE id = ?");
    return stmt.get(id);
  };
  
  // 📌 Actualizar un usuario por ID
  export const updateUser = (id, nome) => {
    const stmt = db.prepare("UPDATE usuarios SET nome = ? WHERE id = ?");
    return stmt.run(nome, id);
  };
  
  // 📌 Eliminar un usuario por ID
  export const deleteUser = (id) => {
    const stmt = db.prepare("DELETE FROM usuarios WHERE id = ?");
    return stmt.run(id);
  };