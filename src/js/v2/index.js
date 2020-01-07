const loans = require('../data');
const $ = s => document.querySelector(s);

const get_loan_item_HTML = (data) => {
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
    `), '');
};

const set_loan_list_HTML = (html) => {
    $('#loan_list').innerHTML = html;
};

const compose = (...fns) => {
    return (arg) => {
        return fns.reduce((acc, fn) => {
            return fn(acc);
        }, arg);
    }
};

const render = compose(get_loan_item_HTML, set_loan_list_HTML);

render(loans);

let current = {
    loans: loans,
    sort_by: 'register'
};

const set_state = (new_state) => {
    current = { ...current, ...new_state };
    return current;
};

const compare_function_hash = {
    register: (a, b) => a.id - b.id,
    interest: (a, b) => a.interest.min - b.interest.min,
    limit: (a, b) => b.limit - a.limit
};

const add_event_listener = (selector, element, listener) =>
  $(selector).addEventListener(element, listener);

const on_click = (selector, listener) =>
  add_event_listener(selector, 'click', listener);

const on_change = (selector, listener) =>
  add_event_listener(selector, 'change', listener);

const has_class = (element, class_name) =>
  element.classList.contains(class_name);

const toggle_class = (element, class_name) =>
  element.classList.toggle(class_name);

on_click('#is_prime', ({ currentTarget }) => {
    const has_class_all = has_class(currentTarget, 'all');

    if (has_class_all) {
        const filtered_loans = current.loans.filter(loan => loan.is_prime);
        set_state({ loans: filtered_loans });
    } else {
        const compare_function = compare_function_hash[current.sort_by];
        const sorted_loans = loans.sort(compare_function);
        set_state({ loans: sorted_loans });
    }

    render(current.loans);
    toggle_class(currentTarget, 'all');
});

on_change('#sort', ({ currentTarget }) => {
    const sort_key = currentTarget.value;
    const compare_function = compare_function_hash[sort_key];
    const sorted_loans = current.loans.sort(compare_function);

    const getProperty = key => obj => obj[key];
    const fn = compose(set_state, getProperty('loans'), render);
    fn({ loans: sorted_loans, sort_by: sort_key });
});
