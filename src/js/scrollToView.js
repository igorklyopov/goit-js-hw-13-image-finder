export default function scrollToView(target) {
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
