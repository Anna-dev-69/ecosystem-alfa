import "./card-product.component.scss";
import heart from "../../assets/like.svg";
import trashCan from "../../assets/trash-can.svg";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface CardProductProps {
  imgSrc: string;
  like: boolean;
  onLike: () => void;
  itemId: number;
  description: string;
}

const CardProduct = (props: CardProductProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      style={{ textDecoration: "none", color: "rgb(0, 0, 41)" }}
      onClick={() => navigate(`/products/${props.itemId}`)}
    >
      <div className="CardProduct">
        <div className="CardProduct__container-img">
          <img className="CardProduct__img-product" src={props.imgSrc} alt="" />
        </div>

        <div className="CardProduct__container-like-and-trashCan">
          <button
            className="CardProduct__button"
            onClick={(e) => {
              e.stopPropagation();

              console.log("propagation");
              const itemId = props.itemId;

              dispatch({ type: "DELETE_PRODUCTS", payload: itemId });
              dispatch({ type: "DELETE_LIKED_CARDS", payload: itemId });
            }}
          >
            <img style={{ width: "24px" }} src={trashCan} alt="" />
          </button>

          <button
            className="CardProduct__button"
            onClick={(e) => {
              e.stopPropagation();
              props.onLike();
            }}
          >
            <img
              style={{
                width: "24px",
                filter: props.like
                  ? "var(--filter-like-red)"
                  : "var(--filter-icon-like)",
              }}
              src={heart}
              alt=""
            />
          </button>
        </div>

        <div className="CardProduct__text">{props.description}</div>
      </div>
    </div>
  );
};

export default CardProduct;
