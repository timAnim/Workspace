var store, render;

(function(window) {
  //简单封装query的方法
  var $ = query => {
    return document.querySelector(query);
  };

  //简单封装监听事件方法
  HTMLElement.prototype.addEvent = function(type, fn) {
    this.addEventListener(type, function(e) {
      fn.call(this, e)
    },false)
  }

  var input = $('.search-input'),
    result = $('.search-result'),
    button = $('.search-btn'),
    radio = $('.radio'),
    toggle = $('.toggle-btn');

  store = statemanager({
    text: '',
    sex: 'a',
    age: 'a',
  });

  input.addEvent('input', function() {
    button.setAttribute('state', this.value ? 'clear' : '')
    store.dispatch({ type: 'text', value: this.value })
  });

  button.addEvent('click', function() {
    input.value = '';
    this.removeAttribute('state');
    store.dispatch({ type: 'text', value: '' })
  })

  radio.addEvent('click', e => {
    var k_v = e.target.id.split('-');
    if (k_v.length > 1) {
      var oldVal = store.getState(k_v[0]),
        active = $(`#${k_v[0]}-${oldVal}`);

      active.classList.remove('active');
      e.target.classList.add('active');
      store.dispatch({ type: k_v[0], value: k_v[1] })
    }
  })

  toggle.addEvent('click', function() {
    var flag = $('.filter').getAttribute('state');
    $('.filter').setAttribute('state', flag === 'open' ? 'close' : 'open')
  })

  render = function(arr) {
    var html = '';
    arr.forEach(item => {
      html += `<li class="result-li">
          <img class="li-avatar" src="${item.src}">
          <span class="li-info">
            <p class="info-name">
              ${item.name} ${((item.sex === 'f') ? '女' : '男')} ${item.age}
            </p>
            <p class="info-des">${item.des}</p>
          </span>
        </li>`
    })
    result.innerHTML = html
  }

  store.subscribe(() => {
    render(filter())
    input.focus();
  })

  render(data);

}(window))