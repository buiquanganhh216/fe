import React from "react";
import { Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import categoryApi from "src/apis/categoryApi";
import courseApi from "src/apis/courseApi";
import FormControl from "src/components/FormControl";
import Pagination from "src/components/Pagination";
import { useTypingDebounce } from "src/hooks";
import { ICourse, SearchKeyProps } from "src/types";
import formatCharacter from "src/utils/formatCharacter";
import CourseContainer from "./CourseContainer";
import "./CoursePage.scss";

const CoursePage = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [searchKey, setSearchKey] = useState<SearchKeyProps>();
  const [totalCourse, setTotalCourse] = useState<number>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(8);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //for search
  const [categoryList, setCategoryList] = useState<any>();
  const [category, setCategory] = useState<string>("all");
  const [price, setPrice] = useState<any>("0");
  const [sort, setSort] = useState<string>("default");

  //debounce
  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [name, setName] = useState<string>();

  useEffect(() => {
    setName(debouncedValue);
    setPage(1);
  }, [debouncedValue]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getCourses();
  }, [limit, page, sort, category, name, price]);

  // call page
  useEffect(() => {
    if (window.screen.width <= 430) {
      setLimit(4);
    }
  }, []);

  const getCourses = async () => {
    const params = {
      publish: true,
      limit,
      page,
      sort,
      category,
      name,
      ...price,
    };
    setIsLoading(true);
    try {
      const response = await courseApi.getCourses(params);
      const { courses, searchKey, total }: any = response;
      setCourses(courses);
      setSearchKey(searchKey);
      setIsLoading(false);
      setTotalCourse(total);
      setTotal(formatCharacter.numberRound(total / limit));
    } catch (error) {
      console.log("lỗi rồi", { error });
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await categoryApi.getCategories();
      const { categories }: any = response;
      const listCategory = categories.map((category: any) => {
        return { name: category.name, value: category.slug };
      });
      setCategoryList([{ name: "Tất cả", value: "all" }, ...listCategory]);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const [showSupportItems, setShowSupportItems] = React.useState(false);
  const toggleSupportItems = () => {
    setShowSupportItems(!showSupportItems);
  };

  return (
    <>
      <div className="course-page">
        <span className="title">Danh sách các khoá học</span>
        {/* search input */}
        <div className="search-courses">
          {/* input search text */}
          <FormControl.Input
            className="input-text"
            style={{ width: 350 }}
            placeholder="Hãy nhập tên khoá học muốn tìm"
            onChange={(e: any) => setValue(e.target.value)}
          />
          {/* input select item */}
          <div className="input-select">
            {categoryList && (
              <Box sx={{ width: 270 }}>
                <FormControl.InputSelect
                  defaultValue={category}
                  list={categoryList}
                  onChange={(status) => {
                    setPage(1);
                    setCategory(status);
                  }}
                  style={{ border: "1px solid #e2e8f0" }}
                />
              </Box>
            )}
          </div>
        </div>

        {/* what for u using to search?? */}
        <div className="keyword-to-search">
          {name && searchKey?.suggestion && searchKey.original !== "" ? (
            <>
              <span className="key-search">
                Đang search với từ khoá <b>{searchKey.original}</b>
              </span>
              <span>
                Hiển thị kết quả cho từ <b>{searchKey.suggestion}</b>
              </span>
            </>
          ) : totalCourse && totalCourse > 0 ? (
            <span>
              Có <b>{totalCourse}</b> kết quả hiển thị
            </span>
          ) : (
            <span>Không có kết quả hiển thị</span>
          )}
        </div>
        <Divider />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 45,
            }}
          >
            <CourseContainer
              title="Khoá Học Đang Hoạt Động"
              courses={courses}
              isLoading={isLoading}
            />
            {total > 0 && (
              <Pagination
                pageActive={page}
                total={total}
                onChangeValue={(value: any) => {
                  setPage(value);
                }}
              />
            )}
          </Box>
        </Box>
      </div>
      <div className="support" onClick={toggleSupportItems}>
        <i className="fa-solid fa-phone-volume"></i> Hotline <> </>
        <i className="fa-solid fa-caret-up"></i>
        <span className="hotline-text">Tư vấn ngay</span>
      </div>
      {showSupportItems && (
        <div className="support-items">Zalo/Phone: 0974640100</div>
      )}
      {/* footer */}
      <div className="footer">
        <footer
          className="text-center text-lg-start text-dark"
          style={{ backgroundColor: "#ECEFF1" }}
        >
          <section
            className="d-flex justify-content-between p-4 text-white social-media"
            style={{ backgroundColor: "#2d73dd" }}
          >
            <div className="me-5">
              <span>Hãy kết nối với chúng tôi qua:</span>
            </div>
            <div
              style={{
                display: "inline",
              }}
              className="icon-socialMedia"
            >
              <a
                href=""
                className="text-white me-4 ml-3 "
                style={{
                  borderRadius: "50%",
                  border: "1px solid white",
                  padding: "14px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                }}
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href=""
                className="text-white me-4 ml-3"
                style={{
                  borderRadius: "50%",
                  border: "1px solid white",
                  padding: "13px",
                }}
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href=""
                className="text-white me-4 ml-3"
                style={{
                  borderRadius: "50%",
                  border: "1px solid white",
                  padding: "13px",
                }}
              >
                <i className="fa-regular fa-envelope"></i>
              </a>
            </div>
          </section>

          <section className="">
            <div className="container text-center text-md-start mt-5 mb-10">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto">
                  <h6 className="text-uppercase fw-bold mb-2">
                    SPARKLE ENGLISH CENTER
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p className="text-left">
                    Với sự tập trung vào các bài học tương tác, sự chăm sóc cá
                    nhân và một chương trình học toàn diện, Trung tâm tiếng Anh
                    SPARKLE đứng như một điểm sáng về chất lượng giáo dục tiếng
                    Anh, giúp cá nhân phát triển xuất sắc cả trong học vấn và
                    công việc.
                  </p>
                </div>

                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4 no-wrap">
                  <h6 className="text-uppercase fw-bold mb-2">
                    Chăm sóc khách hàng
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="#!" className="text-dark">
                      MDBootstrap
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">
                      MDWordPress
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">
                      BrandFlow
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">
                      Bootstrap Angular
                    </a>
                  </p>
                </div>

                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-2">
                    Luyện thi các khóa học
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p>
                    <a href="#!" className="text-dark">
                      Luyện thi IETLS
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">
                      Luyện thi TOEIC
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">
                      Luyện thi PTE
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">
                      Luyện thi TOEFL
                    </a>
                  </p>
                </div>
                <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-2">Liên hệ</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{
                      width: "60px",
                      backgroundColor: "#7c4dff",
                      height: "2px",
                    }}
                  />
                  <p className="text-left">
                    <i className="fas fa-home mr-3"></i>166/1/17 Quốc lộ 22,
                    phường Trung Mỹ Tây, Quận 12, TP.HCM
                  </p>
                  <p className="text-left">
                    <i className="fas fa-envelope mr-3"></i> info@example.com
                  </p>
                  <p className="text-left mb-12">
                    <i className="fas fa-phone mr-3"></i> 0974640100
                  </p>
                  <p className="text-left fs-6">
                    Mã số doanh nghiệp: 0318073144
                  </p>
                  <p className="text-left fs-6">Ngày cấp: 02/10/2023</p>
                  <p className="text-left fs-6">
                    Nơi cấp: Sở Kế Hoạch Đầu Tư Tp.HCM
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2024 Copyright:{" "}
            <a className="text-dark" href="https://anhngusparkle.edu.vn/">
              anhngusparkle.edu.vn
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};
export default CoursePage;
