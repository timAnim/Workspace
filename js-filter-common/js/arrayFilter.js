
(function(window){
	var input = document.getElementsByClassName('search-input')[0],
	  result = document.getElementsByClassName('search-result')[0],
	  button = document.getElementsByClassName('search-btn')[0],
	  result = document.getElementsByClassName('search-result')[0],
	  radio = document.getElementsByClassName('radio')[0],
	  toggle = document.getElementsByClassName('toggle-btn')[0],
	  store = {
	    text: '',
	    sex: 'a',
	    age: 'a',
	  },
	  active = document.getElementById('sex-a'),
	  data = [{
	    name: 'tom',
	    sex: 'm',
	    age: '24',
	    des: '这是tim的蝈蝈',
	    src: './img/img01.jpg',
	  }, {
	    name: 'tim',
	    sex: 'm',
	    age: '16',
	    des: '这是弟弟',
	    src: './img/img01.jpg',
	  }, {
	    name: 'jane',
	    sex: 'f',
	    age: '18',
	    des: '这是姐姐',
	    src: './img/img01.jpg',
	  }, {
	    name: 'baby',
	    sex: 'f',
	    age: '4',
	    des: '这是贝贝',
	    src: './img/img01.jpg',
	  }, {
	    name: 'jack',
	    sex: 'm',
	    age: '40',
	    des: '这是老杰克',
	    src: './img/img01.jpg',
	  }];

	function initHdl() {

	  input.addEventListener('input', function() {
	    if (this.value) {
	      button.setAttribute('state', 'clear');
	    } else {
	      button.setAttribute('state', 'input');
	    }
	    store.text = this.value;
	    filter();
	  }, false);

	  button.addEventListener('click', function() {
	    var state = this.getAttribute('state');
	    if (state === 'input') {
	      filter();
	    } else {
	      input.value = '';
	      store.text = '';
	      filter();
	      this.setAttribute('state', 'input');
	    }
	  })

	  radio.addEventListener('click', function(e) {
	    var target = e.target,
	      ret,
	      prop = target.id.split('-')[0],
	      value = store[prop],
	      active = document.getElementById(prop + '-' + value);

	    switch (target.id) {
	      case 'sex-a':
	        ret = 'a';
	        break;
	      case 'sex-m':
	        ret = 'm';
	        break;
	      case 'sex-f':
	        ret = 'f';
	        break;
	      case 'age-a':
	        ret = 'a';
	        break;
	      case 'age-10':
	        ret = '10';
	        break;
	      case 'age-20':
	        ret = '20';
	        break;
	      default:
	        return false;
	    }

	    active.classList.remove('active');
	    target.classList.add('active');
	    store[prop] = ret;
	    filter()
	  })

	  toggle.addEventListener('click', function(e) {
	    var flag = this.getAttribute('checked');
	    if (flag === 'checked') {
	      this.removeAttribute('checked');
	      radio.style.display = 'block';
	    } else {
	      this.setAttribute('checked', 'checked');
	      radio.style.display = 'none';
	    }
	  }, false)
	}

	function filter() {
	  var mutations = {
	    text: filterText,
	    sex: filterSex,
	    age: filterAge,
	  };

	  var finalArr = data;
	  for (var prop in mutations) {
	    finalArr = mutations[prop](finalArr)
	  }

	  render(finalArr);
	}

	function filterText(arr) {
	  return arr.filter(function(item) {
	    return item.name.indexOf(store.text) !== -1
	  })
	}

	function filterSex(arr) {
	  return arr.filter(function(item) {
	    if (store.sex === 'a') {
	      return true
	    } else {
	      return item.sex === store.sex
	    }
	  })
	}

	function filterAge(arr) {
	  return arr.filter(function(item) {
	    if (store.age === 'a') {
	      return true
	    } else {
	      return parseInt(item.age) > parseInt(store.age)
	    }
	  })
	}

	function render(arr) {
	  var html = '';
	  for (var i = arr.length - 1; i >= 0; i--) {
	    html += '<li class="result-li">\
	        <img class="li-avatar" src="' + arr[i].src + '">\
	        <span class="li-info">\
	        	<p class="info-name">' + arr[i].name + ' ' + ((arr[i].sex === 'f') ? '女' : '男') + ' ' + arr[i].age + '</p>\
	        	<p class="info-des">' + arr[i].des + '</p>\
	        </span>\
	      </li>';
	  }
	  result.innerHTML = html;
	}

	initHdl();
	render(data);

}(window))