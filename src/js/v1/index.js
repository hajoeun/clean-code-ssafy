const $ = s => document.querySelector(s);

const render = d => (
$('#loan_list').innerHTML =
d.reduce((h, l) => (`
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
`), ''));

render(loans);

const current = {
    loans: loans,
    sort_by: 'register'
};

const compare = {
    register: (a, b) => a.id - b.id,
    interest: (a, b) => a.interest.min - b.interest.min,
    limit: (a, b) => b.limit - a.limit
};

const add_event_listener = (selector, event_name, listener) =>
  $(selector).addEventListener(event_name, listener);

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
        current.loans = current.loans.filter(loan => loan.is_prime);
    } else {
        current.loans = loans.sort(compare[current.sort_by]);
    }

    render(current.loans);
    toggle_class(currentTarget, 'all');
});

on_change('#sort', ({ currentTarget }) => {
    current.sort_by = currentTarget.value;
    current.loans = current.loans.sort(compare[current.sort_by]);

    render(current.loans);
});
