import chalk from "chalk";
import readline from "readline";

const readLineMenu = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];

function showMenu() {
  console.log('\n    Menú ');
  console.log('1. Agregar tarea');
  console.log('2. Eliminar tarea');
  console.log('3. Completar tarea ');
  console.log('4. Mostrar lista de tareas');
  console.log('5. Salir \n'); 
}

function addTask() {
  readLineMenu.question(chalk.yellowBright('Ingrese la tarea: '), (data) => {
    const task = {
      id: tasks.length + 1,
      description: data,
      completed: false
    };
    tasks.push(task);
    console.log(chalk.greenBright('Se agrego una nueva tarea: '), task);
    showMenu();
  });
}

function deleteTask(){
  if (tasks.length === 0) {
    console.log(chalk.redBright('No tiene tareas registradas que puedas eliminar'));
    return showMenu();
  }
  readLineMenu.question(chalk.yellowBright('Ingresa el ID de la tarea que quieres eliminar: '), (id) => {
        const index = tasks.findIndex(task => task.id === parseInt(id));
        if (index === -1) {
          console.log(chalk.redBright('No se encontraron tareas con el ID ingresado.'));
          showMenu();
        } else {
          tasks.splice(index, 1);
          console.log(chalk.greenBright('La tarea ha sido eliminada correctamente'));
          showMenu();
        }
  });  
}

function completeTask(){
  if (tasks.length === 0) {
    console.log(chalk.redBright('No tiene tareas registradas que puedas completar'));
    return showMenu();
  }
  readLineMenu.question(chalk.yellowBright('Ingrese el ID de la tarea que quieres completar: '), (id) => {
    const index = tasks.find(task => task.id === parseInt(id));
    if (!index) {
      console.log(chalk.redBright('No se encontraron tareas con el ID ingresado.'));
      showMenu();
    } else {
      index.completed= true;
      console.log(chalk.greenBright('Se ha completado la tarea'));
      console.log(tasks[index]);
      showMenu();
    }
  });
}
function showTask() {
  console.log(chalk.blueBright('Lista de tareas:'));
  console.log(tasks);
  showMenu();
}

showMenu();
readLineMenu.on('line', (input) => {
  const opcion = parseInt(input);
  switch (opcion) {
    case 1:
      addTask();
      break;
    case 2:
      deleteTask();
      break;
    case 3:
      completeTask();
      break;
    case 4:
      showTask();
      break;
    case 5:
      readLineMenu.close(console.log(chalk.blueBright("Se ha cerrado el programa")));
      break;
    default:
      console.log('Opción no válida. Por favor, ingrese un número del 1 al 5.');
      showMenu();
      break;
  } 
});




