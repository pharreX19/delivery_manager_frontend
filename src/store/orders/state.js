export const state = {
    orders : [],
    // search_results : [],
    currentOrderIndex: null,
    currentOrderId: null,
    order: {
        customer: {name:'', contact_no: ''},
        status: {status: ''},
        order: {code: '', name: ''},
        assignee: {name: '', id:''},
        price: '',
        order_address: {address: { building: '', island: '', road: '', floor_no: ''}} 
    },
    order_complete_redirect: false,
    total_pages: null
}