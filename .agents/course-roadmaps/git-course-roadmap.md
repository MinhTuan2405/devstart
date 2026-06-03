# Roadmap khóa học Git từ cơ bản đến nâng cao

## Mục tiêu

- Xây dựng khóa học Git tiếng Việt cho cả người mới bắt đầu và lập trình viên đã đi làm.
- Mỗi bài học bám một ý định tìm kiếm rõ ràng để hỗ trợ SEO và AI search.
- Lộ trình đi từ khái niệm, thao tác hằng ngày, làm việc nhóm, quy trình doanh nghiệp đến kỹ thuật nâng cao.

## Nguyên tắc SEO

- Main keyword của khóa học: `học git`.
- Các bài đầu ưu tiên intent beginner: `git là gì`, `git cơ bản`, `học git cho người mới bắt đầu`.
- Các bài giữa ưu tiên intent thực hành: `git branch`, `git merge`, `pull request`, `git workflow`.
- Các bài cuối ưu tiên intent nâng cao: `git rebase`, `git revert`, `git stash`, `git hooks`, `git bisect`, `git trong doanh nghiệp`.
- Mỗi bài có đoạn trả lời trực tiếp, code block, lỗi thường gặp, bài tập và FAQ để dễ được trích dẫn bởi Google AI Overviews và LLM.

## Lộ trình đề xuất

| Thứ tự | Bài học | Mục tiêu SEO | Lý do có trong khóa học |
|---|---|---|---|
| 1 | Git là gì | Bắt keyword tổng quan | Giải thích Git dùng để làm gì trước khi học lệnh |
| 2 | Cài đặt Git và cấu hình ban đầu | Bắt intent setup | Người mới cần cài đúng tên, email, SSH/HTTPS |
| 3 | Repository, working tree, staging và commit | Bắt keyword khái niệm lõi | Là nền tảng để hiểu mọi lệnh Git sau đó |
| 4 | git status, git add và git commit | Bắt intent thao tác hằng ngày | Đây là bộ lệnh dùng nhiều nhất khi đi làm |
| 5 | git diff, git log và git show | Bắt intent đọc thay đổi | Giúp người học review code trước khi commit |
| 6 | Branch trong Git | Bắt keyword branch | Cần cho feature branch và làm việc nhóm |
| 7 | Merge và conflict trong Git | Bắt keyword conflict | Một trong các vấn đề phổ biến nhất trong doanh nghiệp |
| 8 | Remote, clone, fetch, pull và push | Bắt intent GitHub/GitLab | Kết nối local repo với remote repository |
| 9 | Pull request và code review | Bắt keyword PR | Quy trình bắt buộc trong team chuyên nghiệp |
| 10 | Git workflow doanh nghiệp | Bắt keyword workflow | Nối lệnh Git với quy trình phát triển phần mềm thật |
| 11 | Rebase trong Git | Bắt keyword nâng cao | Giúp giữ lịch sử sạch và hiểu rebase vs merge |
| 12 | Undo an toàn với restore, reset và revert | Bắt intent sửa sai | Chủ đề quan trọng cho cả junior và senior |
| 13 | Git stash và git worktree | Bắt keyword năng suất | Giúp chuyển ngữ cảnh khi làm nhiều task |
| 14 | Tag, release và versioning | Bắt intent release | Gắn Git với phát hành sản phẩm |
| 15 | .gitignore, Git LFS và file lớn | Bắt intent quản lý file | Tránh commit rác, build output, binary nặng |
| 16 | Git hooks và pre-commit | Bắt intent automation | Tự động kiểm tra trước khi commit/push |
| 17 | Submodule, subtree và monorepo | Bắt keyword nâng cao | Giúp hiểu repo phức tạp trong công ty lớn |
| 18 | Bảo mật khi dùng Git | Bắt intent secret/protected branch | Tránh rò rỉ token và phá lịch sử repo |
| 19 | Debug bằng blame, bisect và reflog | Bắt keyword advanced troubleshooting | Tìm commit gây lỗi và cứu lịch sử local |
| 20 | Dự án thực chiến Git trong doanh nghiệp | Bắt keyword project intent | Tổng hợp quy trình từ issue đến release |

## Giai đoạn nội dung

### Giai đoạn 1: Nền tảng

- Bài 1-5
- Mục tiêu: hiểu Git, repo, staging, commit và cách đọc thay đổi.

### Giai đoạn 2: Làm việc nhóm

- Bài 6-10
- Mục tiêu: dùng branch, merge, remote, pull request và workflow team.

### Giai đoạn 3: Nâng cao an toàn

- Bài 11-16
- Mục tiêu: rebase, undo, stash, release, ignore file, hooks và tự động hóa.

### Giai đoạn 4: Doanh nghiệp và xử lý sự cố

- Bài 17-20
- Mục tiêu: repo phức tạp, bảo mật, debug lịch sử và dự án mô phỏng cuối khóa.

## Ghi chú triển khai

- Landing page khóa học nên dùng `học git`, `git cơ bản`, `git nâng cao`, `git trong doanh nghiệp`.
- Các bài thực hành dùng repo giả lập đơn giản để người học có thể làm theo ngay.
- Tránh hướng dẫn phá lịch sử remote bằng force push nếu chưa giải thích rủi ro.
- Với lệnh nguy hiểm như `reset --hard`, chỉ nhắc như khái niệm rủi ro và ưu tiên `restore`, `revert`, `reset --soft`.
