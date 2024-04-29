// 페이지 로드 시 페이드 효과 구현
document.addEventListener(domContentLoaded, () => {
    window.setTimeout(() => {
        document.body.classList.remove(fade);
    });
});
