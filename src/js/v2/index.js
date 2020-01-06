const $ = selector => document.querySelector(selector);

const getHTML = data => {
    return data.reduce((html, loan) => (`
        ${html}
        <li class="loan_item">
            <div class="name_and_organization">
                <strong>${loan.name}</strong>
                <span>${loan.organization}</span>
            </div>
            <br/>
            <div class="limit_and_interest">
                <div class="limit">
                    한도 <span>${loan.limit}</span>
                </div>
                <div class="interest">
                    금리 <span>${loan.interest.min} ~ ${loan.interest.max}</span>
                </div>
            </div>
        </li>
    `), '');
};

const render = data => {
    $('#loan_list').innerHTML = getHTML(data);
};

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

const add_event_listener = (selector, event_name, listener) => $(selector).addEventListener(event_name, listener);
const add_click_event = (selector, listener) => add_event_listener(selector, 'click', listener);
const add_change_event = (selector, listener) => add_event_listener(selector, 'change', listener);

const has_class = (element, class_name) => element.classList.contains(class_name);
const toggle_class = (element, class_name) => element.classList.toggle(class_name);

const track_event = (has_class_all) => {
    const filter_name = has_class_all ? 'prime_only' : 'all';
    console.log({
        screen_name: 'loans_page',
        number_of_loans: current.loans.length + 1,
        filter_name: filter_name,
        event_name: 'click_filter'
    });
};

add_click_event('#is_prime', ({ currentTarget }) => {
    const has_class_all = has_class(currentTarget, 'all');

    if (has_class_all) {
        const is_prime = loan => loan.is_prime;
        const filtered_loans = current.loans.filter(is_prime);

        set_state({ loans: filtered_loans });
    } else {
        const compare_function = compare_functions[current.sort_by];
        const sorted_loans = loans.sort(compare_function);

        set_state({ loans: sorted_loans });
    }

    track_event(has_class_all);
    render(current.loans);
    toggle_class(currentTarget, 'all');
});

add_change_event('#sort', ({ currentTarget }) => {
    const compare_function_name = currentTarget.value;
    const compare_function = compare_functions[compare_function_name];
    const sorted_loans = current.loans.sort(compare_function);

    set_state({ loans: sorted_loans, sort_by: compare_function_name });
    render(current.loans);
});
