document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Saqlangan rejalarni yuklash
  loadTasks();

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      addTask();
  });

  function addTask() {
      if (taskInput.value.trim() === '') return;

      const taskText = taskInput.value;
      const li = document.createElement('li');
      li.innerHTML = `
          <span>${taskText}</span>
          <button onclick="removeTask(this)">O'chirish</button>
      `;

      taskList.appendChild(li);
      taskInput.value = '';

      // Rejani saqlash
      saveTasks();
  }

  window.removeTask = function(button) {
      button.parentElement.remove();
      saveTasks();
  };

  function saveTasks() {
      const tasks = [];
      document.querySelectorAll('#task-list li span').forEach(task => {
          tasks.push(task.textContent);
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
          const li = document.createElement('li');
          li.innerHTML = `
              <span>${task}</span>
              <button onclick="removeTask(this)">Bajarildi</button>
          `;
          taskList.appendChild(li);
      });
  }
});