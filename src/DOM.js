/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const el = document.createElement(tag);
        el.textContent = content;
        document.body.append(el);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    // Рекурсивная функция для построения уровней
    function build(currentLevel) {
        const div = document.createElement('div');
        div.className = `item_${currentLevel}`;

        if (currentLevel < level) {
            for (let i = 0; i < childrenCount; i++) {
                div.append(build(currentLevel + 1)); // Если не достигли максимальной глубины, добавляем потомков
            }
        }
        return div;
    }

    return build(1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const root = generateTree(2, 3);

    // Находим все элементы с классом item_2 внутри дерева
    const itemsToReplace = root.querySelectorAll('.item_2');

    itemsToReplace.forEach((div) => {
        const section = document.createElement('section');
        section.className = div.className;

        while (div.firstChild) {
            section.append(div.firstChild);
        }
        div.replaceWith(section);
    });
    return root;
}
