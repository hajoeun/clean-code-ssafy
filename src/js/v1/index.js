const $ = s => document.querySelector(s);

const getHTML = (data) => {
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
`), '')
};

const setHTML = (html) => {
    $('#loan_list').innerHTML = html;
};

const compose = (f1, f2) => {
  return data => {
      return f2(f1(data));
  };
};

const render = compose(getHTML, setHTML);

render(loans);

let current = {
    loans: loans,
    sort_by: 'register'
};

const set_state = (new_state) => {
    current = { ...current, ...new_state };
    return current;
};

const compare_functions = {
    register: (a, b) => a.id - b.id,
    interest: (a, b) => a.interest.min - b.interest.min,
    limit: (a, b) => b.limit - a.limit
};

const add_event_listener = (selector, event_name, listener) =>
  $(selector).addEventListener(event_name, listener);

const click_event_listener = (selector, listener) =>
  add_event_listener(selector, 'click', listener);

const change_event_listener = (selector, listener) =>
  add_event_listener(selector, 'change', listener);

const has_class = (element, class_name) =>
  element.classList.contains(class_name);

const toggle_class = (element, class_name) =>
  element.classList.toggle(class_name);


const track_event = (has_class_all) => {
    console.log({
      screen_name: 'loans_page',
      number_of_loans: current.loans.length + 1,
      filter_name: has_class_all ? 'only_prime' : 'all',
      event_name: 'click_filter'
    });
};

click_event_listener('#is_prime', ({ currentTarget }) => {
    const has_class_all = has_class(currentTarget, 'all');

    if (has_class_all) {
        const filtered_loans = current.loans.filter(loan => loan.is_prime);
        set_state({ loans: filtered_loans });
    } else {
        const sorted_loans = loans.sort(compare_functions[current.sort_by]);
        set_state({ loans: sorted_loans });
    }

    track_event(has_class_all);
    render(current.loans);
    toggle_class(currentTarget, 'all');
});

change_event_listener('#sort', ({ currentTarget }) => {
    current.sort_by = currentTarget.value;
    const compare_function = compare_functions[current.sort_by];
    const sorted_loans = current.loans.sort(compare_function);

    set_state({ loans: sorted_loans });
    render(current.loans);
});
