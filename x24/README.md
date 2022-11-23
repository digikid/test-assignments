<div align="center">
  <p><img alt="X24" src="https://github.com/digikid/test-assignments/raw/main/x24/logo.svg" width="240" /></p>
  <h1>Тестовое задание<br>для компании «X24»</h1>
  <p><b><a href="https://x24.cloud/">x24.cloud</a></b></p>
</div>

## TypeScript

### Задача

```ts
const list: Array<IEmployee | IEquipment> = [
    { id: 1, last_name: 'Иванов', first_name: 'Иван', type: 'worker' },
    { id: 1, name: 'Токарный станок' },
    { id: 2, last_name: 'Петров', first_name: 'Иван', type: 'manager' },
    { id: 3, last_name: 'Сидоров', first_name: 'Иван', type: 'manager' },
    { id: 2, name: 'Фрезеровочный станок' },
    { id: 4, last_name: 'Васильев', first_name: 'Иван', type: 'director' }
];

// Написать классы для Employee/Equipment в соответствии с интерфейсом

// смаппить новый массив, в котором получить уже инстансы классов
// const mappedList: Array<Employee | Equipment> = ...

const loadItems = (): Promise<Array<IEmployee | IEquipment>> => Promise.resolve(list);

class Controller {
items: Array<Employee | Equipment> = mappedList.slice(0);

// реализовать метод получения всех эмплоеров
// getEmployees (): Employee[] {...}

// реализовать метод поиска, просто вхождение строки в стринговые поля моделек
// find (search: string): Array<Employee | Equipment> {

// реализовать метод загрузки, который сходит на loadItems() и получит массив json, сложит модельки в items и вернет их
load (): Promise<Employee | Equipment> { ... }
}
```

### Решение

https://playcode.io/1017906

## HTML / CSS / Vue

### Задача

<p><b><a href="https://github.com/digikid/test-assignments/raw/main/x24/source/popup.svg">Макет</a></b></p>

У поп-апа есть хедер, у него по углам есть 4 сектора:

1. Плашка статуса;
2. Кнопка «Закрыть» (размер фиксированный);
3. Заголовок;
4. Иконки с экшенами (кнопок может быть много или не быть вовсе).

Обязательны только заголовок и кнопка закрытия.

**В идеальной картине мира:**

1. Если в верхнем левом углу нет плашки со статусом, то заголовок поднимается вверх.
2. Если справа от заголовка нет иконок, то заголовок может растянуться на всю ширину поп-апа и зайти под кнопку закрыть.
3. При сужении окна заголовок переносится на несколько строк и не налазит на другие элементы.

Верстать не нужно, просто предложить концепт решения, возможно с ограничениями, может не все удастся реализовать и пр.

### Решение

https://playcode.io/1017906
