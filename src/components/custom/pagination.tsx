import { memo, useEffect, useState } from 'react';
import cn from 'classnames';
import styles from 'src/styles/custom.module.css';

type Props = {
  currentPage?: number; // default 1
  total: number; // 전체 데이터 개수
  onPageChange: (page: number) => void;
};

export const PAGE_LIST_PER_ONCE = 5;

const Pagination = ({ total, currentPage, onPageChange }: Props) => {
  const isArrow = total > PAGE_LIST_PER_ONCE;
  const [current, setCurrent] = useState(1);

  /** 현재 페이지 위치하는 곳에서 페이지 수 */
  const getPageGroup = () => {
    let currentPageGrp = Math.floor(current / PAGE_LIST_PER_ONCE); // 현재 페이지 그룹 위치
    if (current % PAGE_LIST_PER_ONCE === 0) {
      currentPageGrp -= 1;
    }

    const page: number[] = [];

    for (let i = 1; i <= PAGE_LIST_PER_ONCE; i += 1) {
      const pageNo = currentPageGrp * PAGE_LIST_PER_ONCE + i;
      const pageTotalCount = Math.floor(total / PAGE_LIST_PER_ONCE); // 총 생성될 페이지 수
      if (pageNo > pageTotalCount) break;
      page.push(pageNo);
    }

    return page;
  };

  /** 페이지 선택 */
  const handlePageClick = (page: number) => {
    if (page === current) {
      return;
    }

    setCurrent(page);
    onPageChange(page);
  };

  useEffect(() => {
    currentPage && setCurrent(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.pagination}>
      {isArrow && <></>}
      {getPageGroup().map((v) => (
        <a key={v} className={cn({ [styles.selected]: v === current })} onClick={() => handlePageClick(v)}>
          <span>{v}</span>
        </a>
      ))}
      {isArrow && <></>}
    </div>
  );
};

export default memo(Pagination);
