//    IMPORT

import app from "./extra.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

//    SETTIN OF THE VARIABLES
const db = getFirestore(app);

const taskForm = document.querySelector("#task-form");
const taskContainer = document.getElementById("task-container");

let editStatus = false;
let id2 = "";

//    FUNCTIONS
const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), {
    title,
    description
  });

const getTask = () => getDocs(collection(db, "tasks"));

const getTask_ = (id) => getDocs(doc(db, "tasks", id));

const updateTask = (id, updatedTask) =>
  updateDoc(doc(db, "tasks", id), updatedTask);

const onGetTask = (callback) => onSnapshot(collection(db, "tasks"), callback);

const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

//    RUN EVERY RELOAD
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTask((querySnapShot) => {
    taskContainer.innerHTML = "";

    querySnapShot.forEach((doc) => {
      console.log(doc.data());

      const task = doc.data();
      task.id = doc.id;

      taskContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
        <h3 class="h5">  ${task.title}  </h3>
        <p> ${task.description} </p>
  
        <div>
          <button class="btn btn-primary btn-delete" data-id="${task.id}">Delete<button>
          <button class="btn btn-secondary btn-edit" id="btn-edit" data-id="${task.id}">Edit<button>
        </div>
        </div>
      `;

      const btnsDelete = document.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id_ = e.target.dataset.id;
          console.log(id_);
          await deleteTask(id_); //   Smth wrong
        });
      });

      const btnsEdit = document.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id_ = e.target.dataset.id;
          console.log(id_);

          const doc_ = await getTask_(id_);
          const task_ = doc_.data();

          editStatus = true;
          id2 = doc_.id;

          taskForm["task-title"].value = task_.title;
          taskForm["task-description"].value = task_.description;

          taskForm["btn-task-form"].innerText = "Update";
        });
      });

      //stop
    });
  });
});

//    RUN EVERY SUBMIT
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  if (!editStatus) {
    await saveTask(title.value, description.value);
  } else {
    await updateTask(id2, {
      title: title.value,
      description: description.value
    });

    editStatus = false;
    id2 = "";
    taskForm["btn-task-form"].innerText = "Save";
  }

  await getTask();

  taskForm.reset();
  title.focus();
});

/*
 * Funciones Awake:
 * no es necesario guardarla porque es una función no un procedimiento
 *
 * querySnapShot:
 * Es una especie de objeto que se puede recorrer.
 * Como un array pero dentro de un objeto que regresa el getTask()
 *
 */
