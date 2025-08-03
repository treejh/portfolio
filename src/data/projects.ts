import { Project } from "../types/project";
import { juseyo } from "./projects/juseyo";
import { hakple } from "./projects/hakple";
import { booktree } from "./projects/booktree";

// UI 이미지 정의
export const uiImages = {
  juseyo: [
    {
      src: "/images/주세요메인화면.png",
      alt: "Juseyo 메인화면",
      title: "Juseyo 메인 페이지",
    },
    {
      src: "/images/주세요관리자대시보드.png",
      alt: "Juseyo 관리자대시보드",
      title: "관리자 대시보드",
    },
    {
      src: "/images/주세요비품요청내역.png",
      alt: "Juseyo 비품요청내역",
      title: "비품 요청내역 조회",
    },
    {
      src: "/images/주세요비품반납내역.png",
      alt: "Juseyo 비품반납내역",
      title: "비품 반납내역 조회",
    },
    {
      src: "/images/주세요입고내역.png",
      alt: "Juseyo 입고내역",
      title: "입고내역 조회",
    },
    {
      src: "/images/사용자 맞춤 추천 비품.png",
      alt: "Juseyo 사용자 맞춤 추천 비품",
      title: "일반회원 대시보드",
    },
    {
      src: "/images/주세요비품요청.png",
      alt: "Juseyo 비품요청",
      title: "나의 비품 요청 리스트",
    },
    {
      src: "/images/주세요새비품요청.png",
      alt: "Juseyo 새비품요청",
      title: "새 비품 요청",
    },
    { src: "/images/주세요검색.png", alt: "Juseyo 검색", title: "검색 기능" },
    { src: "/images/주세요채팅.png", alt: "Juseyo 채팅", title: "채팅 기능" },
  ],
  hakple: [
    {
      src: "/images/학플메인페이지.png",
      alt: "Hakple 메인페이지",
      title: "Hakple 메인페이지",
    },
    {
      src: "/images/학플홈페이지.png",
      alt: "Hakple 홈페이지",
      title: "홈페이지",
    },
    { src: "/images/학플게시판.png", alt: "Hakple 게시판", title: "게시판" },
    { src: "/images/학플게시물.png", alt: "Hakple 게시물", title: "게시물" },
    {
      src: "/images/학플마이페이지.png",
      alt: "Hakple 마이페이지",
      title: "마이페이지",
    },
    {
      src: "/images/관리자페이지.png",
      alt: "Hakple 관리자페이지",
      title: "관리자페이지",
    },
  ],

  booktree: [
    {
      src: "/images/북트리메인페이지.png",
      alt: "BookTree 메인페이지",
      title: "메인페이지",
    },
    {
      src: "/images/북트리로그인페이지.png",
      alt: "BookTree 로그인페이지",
      title: "로그인페이지",
    },
    {
      src: "/images/북트리블로그페이지.png",
      alt: "BookTree 블로그페이지",
      title: "블로그페이지",
    },
    {
      src: "/images/북트리게시글작성.png",
      alt: "BookTree 게시글작성",
      title: "게시글 작성",
    },
    {
      src: "/images/북트리게시글상세.png",
      alt: "BookTree 게시글상세",
      title: "게시글 상세보기",
    },
    {
      src: "/images/북트리카테고리페이지.png",
      alt: "BookTree 카테고리페이지",
      title: "카테고리페이지",
    },
    {
      src: "/images/북트리팔로우페이지.png",
      alt: "BookTree 팔로우페이지",
      title: "팔로우페이지",
    },
  ],
};

export const projects: Project[] = [juseyo, booktree];
