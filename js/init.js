// 페이지 로드 시 페이드 효과, 세션 초기화 구현
document.addEventListener(domContentLoaded, () => {
    window.setTimeout(() => {
        document.body.classList.remove(fade);
    });

    for (const characterKey in characterList) {
        const item = sessionStorage.getItem(characterKey);

        if (item != null) {
            sessionStorage.setItem(characterKey, false);
        }
    }
});
