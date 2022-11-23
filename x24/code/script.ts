// 1. Написать классы для Employee/Equipment в соответствии с интерфейсом

// (*) Возможно, мы захотим ограничить значения типов для сотрудников
// (*) Если значение может быть любым, вместо EmployeeType можно написать string
type EmployeeType = "worker" | "manager" | "director";

interface IEmployee {
  id: number;
  first_name: string;
  last_name: string;
  type: EmployeeType;
}

class Employee {
  id: number;
  first_name: string;
  last_name: string;
  type: EmployeeType;

  constructor(options: IEmployee) {
    this.id = options.id;
    this.first_name = options.first_name;
    this.last_name = options.last_name;
    this.type = options.type;
  }
}

interface IEquipment {
  id: number;
  name: string;
}

class Equipment {
  id: number;
  name: string;

  constructor(options: IEquipment) {
    this.id = options.id;
    this.name = options.name;
  }
}

const list: Array<IEmployee | IEquipment> = [
  { id: 1, last_name: "Иванов", first_name: "Иван", type: "worker" },
  { id: 1, name: "Токарный станок" },
  { id: 2, last_name: "Петров", first_name: "Иван", type: "manager" },
  { id: 3, last_name: "Сидоров", first_name: "Иван", type: "manager" },
  { id: 2, name: "Фрезеровочный станок" },
  { id: 4, last_name: "Васильев", first_name: "Иван", type: "director" },
];

// 2. Смаппить новый массив, в котором получить уже инстансы классов
// (*) Для проверки на соответствие типа используем перебор ключей объектов
const employeeKeys: Array<keyof IEmployee> = [
  "id",
  "last_name",
  "first_name",
  "type",
];
const equipmentKeys: Array<keyof IEquipment> = ["id", "name"];

// (*) Создаем вспомогательную функцию, которая будет проверять тип
const checkType = <T>(obj: any, keys: (keyof T)[]): obj is T => {
  return keys.every((key) => key in obj);
};

// (*) Вынесем в отдельную функцию перебор массива, т.к. позже она еще понадобится
const getMappedList = (
  list: Array<IEmployee | IEquipment>
): Array<Employee | Equipment> => {
  return list.map((obj) => {
    if (checkType<IEmployee>(obj, employeeKeys)) {
      return new Employee(obj);
    }

    if (checkType<IEquipment>(obj, equipmentKeys)) {
      return new Equipment(obj);
    }
  });
};

// (*) Бинго, получаем массив из инстансов
const mappedList: Array<Employee | Equipment> = getMappedList(list);

const loadItems = (): Promise<Array<IEmployee | IEquipment>> =>
  Promise.resolve(list);

class Controller {
  items: Array<Employee | Equipment> = mappedList.slice(0);

  // 3. Реализовать метод получения всех эмплоеров
  // getEmployees (): Employee[] {...}
  getEmployees(): Array<Employee> {
    // (*) Используем instanceof для проверки на наследование от класса Employee
    return this.items.filter(
      (item): item is Employee => item instanceof Employee
    );

    // (*) Еще один вариант с использованием цикла
    // const result: Array<Employee> = [];

    // for (const item of this.items) {
    //   if (item instanceof Employee) {
    //     result.push(item);
    //   }
    // }

    // return result;
  }

  // 4. Реализовать метод поиска, просто вхождение строки в стринговые поля моделек
  // find (search: string): Array<Employee | Equipment>
  find(search: string): Array<Employee | Equipment> {
    return this.items.filter((item) => {
      // (*) Я решил использовать цикл, так как в момент первого return он останавливает перебор значений
      for (const value of Object.values(item)) {
        // (*) Я намеренно не использую Object.values(item).filter((item) => (typeof item === 'string'))
        // (*) Это будет провоцировать лишнее количество итераций, "дешевле" это сразу делать в цикле
        if (typeof value === "string" && value.includes(search)) {
          return true;
        }
      }

      // (*) Эту же задачу можно решить через reduce
      // (*) Минус такого подхода в том, что массив будет перебираться полностью
      // return Object.values(item).reduce((acc, value) => {
      //   return acc || ((typeof value === 'string') && value.includes(search));
      // }, false);
    });
  }

  // 5. Реализовать метод загрузки, который сходит на loadItems() и получит массив json, сложит модельки в items и вернет их
  // (*) Первый вариант через async / await
  async load(): Promise<Array<Employee | Equipment>> {
    // (*) Если данные запрашиваются с сервера, было бы логично сразу же обработать потенциальные ошибки
    try {
      const data = await loadItems();
      const items = getMappedList(data);

      this.items = items;

      return items;
    } catch (e) {
      console.error("An error occurred while loading data", e);
    }
  }

  // (*) Второй вариант с использованием Promise
  // (*) Если произойдет ошибка, будет возвращен пустой массив
  loadPromise(): Promise<Array<Employee | Equipment>> {
    return loadItems()
      .then((data) => {
        const items = getMappedList(data);

        this.items = items;

        return items;
      })
      .catch((e) => {
        console.error("An error occurred while loading data", e);

        return [];
      });
  }
}

// (*) Создаем экземпляр контроллера
const controller = new Controller();

// (*) Тестируем метод getEmployees()
console.log(controller.getEmployees());

// (*) Тестируем метод find()
console.log(controller.find("станок"));

// (*) Тестируем метод load()
(async () => {
  console.log(await controller.load());
})();
