import { useDispatch, useSelector } from "react-redux";
import "./products.component.scss";
import { DefaultState } from "../../store";
import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Input, Pagination, Spin } from "antd";
import FormItem from "antd/es/form/FormItem";
import { SearchOutlined } from "@ant-design/icons";
import CardList from "../card-list/card-list.component";

interface ProductsProps {
  loading: boolean;
  pageSize: number;
}

const Products = (props: ProductsProps) => {
  const products = useSelector((state: DefaultState) => state.users);
  const dispatch = useDispatch();
  const filteredItems = useSelector(
    (state: DefaultState) => state.filteredListItems
  );
  const navigate = useNavigate();

  const [like, setLike] = useState<{ [key: number]: boolean }>({});
  const [showLikedCards, setShowLikedCards] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLikeProduct = (itemId: number) => {
    setLike((prevLikes) => ({
      ...prevLikes,
      [itemId]: !prevLikes[itemId],
    }));
  };

  useEffect(() => {
    products.forEach((item) => {
      if (like[item.id]) {
        dispatch({ type: "ADD_LIKED_CARDS", payload: item });
      }
    });
  }, [like, products]);

  const handleFilteredSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValueSearch(newValue);

    dispatch({ type: "ADD_FILTERED_LIST-ITEMS", payload: newValue });
    setIsFiltered(true);

    if (newValue.trim() === "") {
      setIsFiltered(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * props.pageSize;
  const indexOfFirstItem = indexOfLastItem - props.pageSize;

  const displayItems = (() => {
    let filteredItemsList = products;

    if (showLikedCards) {
      filteredItemsList = products.filter((item) => like[item.id]);
    } else if (isFiltered) {
      filteredItemsList = filteredItems;
    }

    return filteredItemsList;
  })();

  const handleShowLikedCards = () => {
    setShowLikedCards(() => !showLikedCards);

    setCurrentPage(1);
  };

  const currentItems = displayItems.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="Products">
      <div style={{ display: "flex", width: "80%", gap: "50px" }}>
        <Input
          style={{ flex: "1" }}
          value={valueSearch}
          onChange={handleFilteredSearch}
          addonAfter={<SearchOutlined />}
        />

        <Button
          type="default"
          style={{ color: "rgb(0, 0, 41)" }}
          onClick={() => navigate("/create-card")}
        >
          Создать новую карточку
        </Button>
      </div>

      <div className="Products__show-cards">
        <FormItem label="Показать только избранные карточки">
          <Checkbox onChange={handleShowLikedCards} />
        </FormItem>
      </div>

      <Spin spinning={props.loading}>
        <CardList
          currentItems={currentItems}
          filteredItems={filteredItems}
          handleLikeProduct={handleLikeProduct}
          isFiltered={isFiltered}
          like={like}
          showLikedCards={showLikedCards}
        />
      </Spin>

      <Pagination
        current={currentPage}
        pageSize={props.pageSize}
        total={displayItems.length}
        defaultCurrent={1}
        onChange={handlePageChange}
      />
      <div style={{ marginTop: "5rem" }}></div>
    </div>
  );
};

export default Products;
