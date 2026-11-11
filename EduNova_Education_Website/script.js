const courseSearch = document.getElementById('courseSearch');
const filters = document.getElementById('filters');
const courseCards = [...document.querySelectorAll('.course-card')];
const emptyState = document.getElementById('emptyState');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const toast = document.getElementById('toast');

let activeFilter = 'all';

function filterCourses() {
  const searchTerm = courseSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  courseCards.forEach((card) => {
    const category = card.dataset.category;
    const title = card.dataset.title.toLowerCase();
    const matchesFilter = activeFilter === 'all' || category === activeFilter;
    const matchesSearch = title.includes(searchTerm);
    const shouldShow = matchesFilter && matchesSearch;

    card.style.display = shouldShow ? '' : 'none';
    if (shouldShow) visibleCount++;
  });

  emptyState.style.display = visibleCount ? 'none' : 'block';
}

filters.addEventListener('click', (event) => {
  const button = event.target.closest('.filter');
  if (!button) return;

  activeFilter = button.dataset.filter;
  filters.querySelectorAll('.filter').forEach((filter) => {
    filter.classList.toggle('active', filter === button);
  });
  filterCourses();
});

courseSearch.addEventListener('input', filterCourses);

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.textContent = '☰';
  });
});

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

document.querySelectorAll('.enroll-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const courseName = button.dataset.course;
    showToast(`“${courseName}” kursi tanlandi. Ro‘yxatdan o‘tish uchun hello@edunova.uz ga yozing.`);
  });
});

// FAQ: one item can stay open at a time for a cleaner reading experience.
document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-list details').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
