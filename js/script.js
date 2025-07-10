const todo = document.getElementById('todo');
const tanggal = document.getElementById('tanggal');
const submit = document.getElementById('submit');
const deleteAll = document.getElementById('deleteall');
const filter = document.getElementById('filter');

let parentUl = document.getElementById('parentUl');
let tasks = [];

function createDisplay(text, date) {
    const liBaru = document.createElement('li');
    liBaru.setAttribute('id', 'hapussemua');
    liBaru.className = 'flex justify-between items-center py-2 px-2';
    liBaru.innerHTML = `<p class="ml-4">${text}</p>
    <p class="md:pl-14">${date == '' ? 'No date' : date}</p>
    <p class="md:pl-10 lg:pl-2">Pending</p>
    <div class="grid gap-2 mr-7 md:grid-cols-2 md:mr-6 lg:mr-14">
    <button type="submit"
    class="selesai cursor-pointer bg-green-500 rounded-sm p-1 focus:ring-1 focus:ring-green-200">
    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
    stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
    </svg>
    </button>
    <button type="submit"
    class="hapus cursor-pointer bg-red-500 rounded-sm p-1 focus:ring-1 focus:ring-red-200">
    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
    viewBox="0 0 24 24">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                        </button>
                        </div>`;
    return liBaru;
}

const noTask = document.getElementById('notask');

function tambah(value) {
    if (value == '') {
        alert('Please fill the field')
    } else {
        if (!noTask.classList.contains('hidden')) {
            noTask.classList.add('hidden');
        }

        const task = {
            text: todo.value,
            date: tanggal.value == '' ? 'No date' : tanggal.value,
            status: 'pending'
        }
        const elementBaru = createDisplay(task.text, task.date);
        tasks.push(task);
        parentUl.appendChild(elementBaru);
        if (tasks.length > 3) {
            parentUl.classList.add('overflow-y-scroll', 'h-56');
        }

        const selesai = elementBaru.querySelector('.selesai');
        const hapus = elementBaru.querySelector('.hapus');

        selesai.addEventListener('click', function () {
            const ubahStatus = elementBaru.querySelector('p:nth-child(3)');
            ubahStatus.textContent = 'completed';

            const index = Array.from(parentUl.children).indexOf(elementBaru);
            tasks[index - 2].status = 'completed';
        });

        hapus.addEventListener('click', function () {
            const index = Array.from(parentUl.children).indexOf(elementBaru);
            tasks.splice(index - 2, 1);
            elementBaru.remove();

            if (tasks.length < 4) {
                parentUl.classList.remove('overflow-y-scroll', 'h-56');
            }

            if (tasks.length == 0) {
                noTask.classList.remove('hidden');
            }
        });
    }
}


function filterTasks(status) {

    const tasksStatus = parentUl.querySelectorAll('li');
    tasksStatus.forEach(task => {
        const item = task.querySelector('p:nth-child(3)');
        if (status == 'all') {
            task.classList.remove('hidden');
        } else if (status == item.textContent) {
            task.classList.remove('hidden');
        } else {
            task.classList.add('hidden');
        }
    });
}

function animate() {
    filter.parentElement.classList.remove('pb-32');
    showAll.classList.remove('translate-y-[3rem]');
    showAll.classList.add('scale-0');
    pending.classList.remove('translate-y-[6rem]');
    pending.classList.add('scale-0');
    completed.classList.remove('translate-y-[9rem]');
    completed.classList.add('scale-0');
}

deleteAll.addEventListener('click', function () {
    tasks = [];
    const item = Array.from(parentUl.children);
    for (let i = 2; i < item.length; i++) {
        parentUl.removeChild(item[i]);
    }
    noTask.classList.remove('hidden');
});

const showAll = filter.parentElement.querySelector('button:nth-child(2)');
const pending = filter.parentElement.querySelector('button:nth-child(3)');
const completed = filter.parentElement.querySelector('button:nth-child(4)');

filter.addEventListener('click', function () {
    filter.parentElement.classList.add('pb-32');
    showAll.classList.add('translate-y-[3rem]');
    showAll.classList.remove('scale-0');
    pending.classList.add('translate-y-[6rem]');
    pending.classList.remove('scale-0');
    completed.classList.add('translate-y-[9rem]');
    completed.classList.remove('scale-0');
});

pending.addEventListener('click', function () {
    animate();
    filterTasks('Pending'); 
});

completed.addEventListener('click', function () {
    animate();
    filterTasks('completed');
});

showAll.addEventListener('click', function () {
    animate();
    filterTasks('all');
});

submit.addEventListener('click', function () {
    tambah(todo.value);
    tanggal.value = '';
    todo.value = '';
});