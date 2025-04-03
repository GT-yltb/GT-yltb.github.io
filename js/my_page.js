// 移动端菜单切换
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});


// 搜索框展开/收起功能
const searchIconBtn = document.getElementById('search-icon-btn');
const searchExpandable = document.getElementById('search-expandable');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// 点击搜索图标展开搜索框
searchIconBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡
    searchExpandable.classList.toggle('active');
    if (searchExpandable.classList.contains('active')) {
        searchInput.focus(); // 展开后自动聚焦输入框
    }
});

// 点击搜索按钮执行搜索
searchBtn.addEventListener('click', function() {
    performSearch();
});

// 按回车键执行搜索
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// 点击页面其他地方收起搜索框
document.addEventListener('click', function() {
    searchExpandable.classList.remove('active');
});

// 阻止点击搜索框内部时收起
searchExpandable.addEventListener('click', function(e) {
    e.stopPropagation();
});

// 搜索函数
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        alert(`搜索: ${searchTerm}\n实际应用中这里会跳转到搜索结果或滚动到相关内容`);
        searchInput.value = '';
        searchExpandable.classList.remove('active');
    }
}