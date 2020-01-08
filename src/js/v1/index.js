const loans = require("../data");
const $ = s => document.querySelector(s);

const get_HTML = (data) => {
  return data.reduce((h, l) => (`
    ${h}
    <li class="loan_item">
        <div class="name_and_organization">
            <strong>${l.name}</strong>
            <span>${l.organization}</span>
        </div>
        <br/>
        <div class="limit_and_interest">
            <div class="limit">
                한도 <span>${l.limit}</span>
            </div>
            <div class="interest">
                금리 <span>${l.interest.min} ~ ${l.interest.max}</span>
            </div>
        </div>
    </li>
`), "");
};

const set_HTML = (html) => {
  $("#loan_list").innerHTML = html;
};

const compose = (f1, f2) => {
  return (data) => {
    return f2(f1(data));
  };
};

const render = compose(get_HTML, set_HTML);

render(loans);

let current = {
  loans: loans,
  sort_by: "register"
};

const set_state = (new_state) => {
  current = { ...current, ...new_state };
  return current;
};

const get_state = (key) => {
  return current[key];
};

const compare_functions = {
  register: (a, b) => a.id - b.id,
  interest: (a, b) => a.interest.min - b.interest.min,
  limit: (a, b) => b.limit - a.limit
};

const add_event_listener = (selector, element, listener) =>
  $(selector).addEventListener(element, listener);

const on_click = (selector, listener) =>
  add_event_listener(selector, "click", listener);

const on_change = (selector, listener) =>
  add_event_listener(selector, "change", listener);

const has_class = (element, class_name) =>
  element.classList.contains(class_name);

const toggle_class = (element, class_name) =>
  element.classList.toggle(class_name);

const render_by_get_state = compose(get_state, render);

on_click("#is_prime", ({ currentTarget }) => {
  const has_class_all = has_class(currentTarget, "all");

  if (has_class_all) {
    const is_prime = loan => loan.is_prime;
    const filtered_loans = current.loans.filter(is_prime);
    set_state({ loans: filtered_loans });
  } else {

    const sort_key = get_state("sort_by");
    const compare_function = compare_functions[sort_key];
    const sorted_loans = loans.sort(compare_function);

    set_state({ loans: sorted_loans });
  }

  render_by_get_state("loans");
  toggle_class(currentTarget, "all");
});

on_change("#sort", ({ currentTarget }) => {
  const sort_key = currentTarget.value;
  const compare_function = compare_functions[sort_key];
  const sorted_loans = current.loans.sort(compare_function);

  set_state({ loans: sorted_loans, sort_by: sort_key });
  render_by_get_state("loans");
});
