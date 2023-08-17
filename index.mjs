import chalk from "chalk";
import readline from "readline";

const readLineMenu = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];

function showMenu() {
  return new Promise((resolve, reject) => {
    console.log('\n    Menú ');
    console.log('1. Agregar tarea');
    console.log('2. Eliminar tarea');
    console.log('3. Completar tarea ');
    console.log('4. Mostrar lista de tareas');
    console.log('5. Salir \n'); 

    readLineMenu.question('Escoge una opción del menú \n', (menu) => {
      resolve(menu);
    });

  })
}

async function addTask() {  
  const data = await new Promise((resolve) => { 
    readLineMenu.question(chalk.yellowBright('Ingrese la tarea: '), resolve)
  }); 
  const task = {
    id: tasks.length + 1,
    description: data,
    completed: false
  };
  tasks.push(task);
  console.log(chalk.greenBright('Se agrego una nueva tarea: '), task);
}

async function deleteTask() {
  if (tasks.length === 0) {
    console.log(chalk.redBright('No tiene tareas registradas que puedas eliminar'));
    return ;
  }
  const id = await new Promise((resolve) => { 
    readLineMenu.question(chalk.yellowBright('Ingrese el ID de la tarea que quieres eliminar: '), resolve)
  });
  const index = tasks.findIndex(task => task.id === parseInt(id)); 
  if (index === -1) {
    console.log(chalk.redBright('No se encontraron tareas con el ID ingresado.'));
    await deleteTask();
  } else {
    tasks.splice(index, 1);
    console.log(chalk.greenBright('La tarea ha sido eliminada correctamente'));
  } 
}

async function completeTask() {
  if (tasks.length === 0) {
    console.log(chalk.redBright('No tiene tareas registradas que puedas completar'));
    return ;
  }
  const id = await new Promise((resolve) => { 
    readLineMenu.question(chalk.yellowBright('Ingrese el ID de la tarea que quieres completar: '), resolve)
  });
  const index = tasks.find(task => task.id === parseInt(id));
  if (!index) {
    console.log(chalk.redBright('No se encontraron tareas con el ID ingresado.'));
    await completeTask();
  } else {
    index.completed= true;
    console.log(chalk.greenBright('Se ha completado la tarea'));
  }
  
}

function showTask() {
  console.log(chalk.blueBright('Lista de tareas:'));
  console.log(tasks);
}

async function tasksList() { 
  let data ;
  do{
    data = await showMenu();
    switch (data) {
      case '1':
        await addTask();
        break;
      case '2':
        await deleteTask();
        break;
      case '3':
        await completeTask();
        break;
      case '4':
        showTask();
        break;
      case '5':
        readLineMenu.close(console.log(chalk.blueBright("Se ha cerrado el programa")));
        break;
      default:
        console.log(chalk.blueBright('Opción no válida, escoja una opción del 1 al 5.'));
        break;
    } 
  } while (data !== '5')
  readLineMenu.close();
}
tasksList();