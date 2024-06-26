
//유아기, 유년기, 아동기, 청소년기, 성인, 중년, 노년 클릭 시 페이지 넘어가기//
$(document).ready(function() {
    // 버튼 클릭 이벤트 리스너
    $('.everyLife-btn-span button').click(function() {
        let boardLifeCycle = $(this).val();
        fetchPostsByLifeStage(boardLifeCycle);
        console.log(boardLifeCycle);
    });

    function fetchPostsByLifeStage(boardLifeCycle) {
        // lifeStage에 따라 게시글을 가져오는 AJAX 호출
        $.ajax({
            url: `/everyLife/${boardLifeCycle}`, // 실제 엔드포인트 URL로 변경
            type: 'GET',
            data: { boardLifeCycle: boardLifeCycle },
            success: function(response) {
                updatePosts(response);
            },
            error: function(error) {
                console.error("게시글을 가져오는 중 오류 발생:", error);
            }
        });
    }

    function updatePosts(posts) {
        var contentWrap = $('.everyLife-content-wrap');
        contentWrap.empty(); // 현재 내용을 비움

        posts.forEach(function(board) {
            var postHtml = `
                <div class="everyLife-content-box">
                    <a href="/myLife/detail-my?boardId=${board.boardId}">
                        <div class="everyLife-contents">
                            <div class="everyLife-content-title">${board.boardTitle}</div>
                            <div class="everyLife-content-date">작성일 : ${new Date(board.boardCreatedDate).toLocaleDateString('ko-KR')}</div>
                            <div class="everyLife-content-views">조회수 : ${board.boardViewCount}</div>
                            <div class="everyLife-content-writer">
                                <span class="everyLife-writer-profile">
                                    <img src="./../../img/everyLife/everyLife_profile.png" alt="">
                                </span>
                                <span class="everyLife-writer-nickname">${board.nickname}</span>
                            </div>
                            <div class="everyLife-content-detail">${board.boardContent}</div>
                        </div>
                    </a>
                </div>`;
            contentWrap.append(postHtml);
        });
    }
});

$(document).ready(function() {
    // 검색 버튼 이벤트 핸들러
    $("form").submit(function(event) {
        event.preventDefault(); // 기본 폼 제출 동작을 막음
        var keyword = $("input[name='searchKeyword']").val();
        searchContent(keyword);
    });

    // 검색어에 따라 필터링하는 함수
    function searchContent(keyword) {
        $.ajax({
            url: `/everyLife/search`,
            type: 'GET',
            data: { keyword: keyword },
            success: function(data) {
                renderContent(data);
            },
            error: function(error) {
                console.error('Error fetching search results:', error);
            }
        });
    }

    // 서버에서 받은 데이터를 화면에 렌더링하는 함수
    function renderContent(data) {
        var contentWrap = $(".everyLife-content-wrap");
        contentWrap.empty(); // 기존 컨텐츠를 지움

        if (data.length === 0) {
            contentWrap.append('<div class="no-results">검색 결과가 없습니다.</div>');
            return;
        }

        data.forEach(function(board) {
            var contentHtml = `
                <div class="everyLife-content-box">
                    <a href="/myLife/detail-my(boardId=${board.boardId})">
                        <div class="everyLife-contents">
                            <div class="everyLife-content-title">${board.boardTitle}</div>
                            <div class="everyLife-content-date">작성일: ${formatDate(board.boardCreatedDate)}</div>
                            <div class="everyLife-content-views">조회수: ${board.boardViewCount}</div>
                            <div class="everyLife-content-writer">
                                <span class="everyLife-writer-profile">
                                    <img src="./../../img/everyLife/everyLife_profile.png" alt="">
                                </span>
                                <span class="everyLife-writer-nickname">${board.nickname}</span>
                            </div>
                            <div class="everyLife-content-detail">${board.boardContent}</div>
                        </div>
                    </a>
                </div>
            `;
            contentWrap.append(contentHtml);
        });
    }

    // 날짜 포맷팅 함수 =====> 이 함수가 있어야 날짜가 똑바로 뜸 ===> js91번쨰줄
    function formatDate(dateString) {
        var date = new Date(dateString);
        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('ko-KR', options);
    }
});

//
// // 조회순 정렬을 위한 함수
// function sortByViews() {
//     // 선택한 값 가져오기
//     var selectedOption = document.querySelector('.box-select').value;
//
//     // 선택한 값이 'views'인 경우에만 실행
//     if (selectedOption === 'views') {
//         // Ajax 요청을 통해 서버에 데이터 요청
//         $.ajax({
//             url: '/everyLife/viewsDescending', // 요청할 URL 설정
//             type: 'GET', // GET 방식 요청
//             data: { boardViewCount: boardViewCount },
//             success: function (data) {
//                 // 데이터를 받아와서 처리하는 부분
//                 // 받아온 데이터를 이용하여 화면에 표시하거나 다른 작업을 수행할 수 있음
//                 console.log(data); // 받아온 데이터를 콘솔에 출력 (개발 단계에서 확인용)
//                 // 화면에 받아온 데이터를 표시하는 작업을 수행할 수 있음
//             },
//             error: function (error) {
//                 console.error('Error fetching data:', error); // 오류가 발생했을 때 콘솔에 오류 메시지 출력
//             }
//         });
//     }
// }
//
// // 페이지가 로드될 때 실행
// document.addEventListener('DOMContentLoaded', function () {
//     // select 요소의 변경을 감지하여 함수 호출
//     document.querySelector('.box-select').addEventListener('change', sortByViews);
// });
