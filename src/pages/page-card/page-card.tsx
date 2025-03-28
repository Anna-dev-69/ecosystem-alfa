import { useSelector } from "react-redux";
import "./page-card.scss";
import { DefaultState } from "../../store";
import { Link, useParams } from "react-router-dom";

const PageCard = () => {
  const users = useSelector((state: DefaultState) => state.users);
  const { id } = useParams<{ id: string }>();

  const getItemById = (id: number) => {
    return users.find((item) => item.id === id);
  };

  const numberId = Number(id);
  const item = getItemById(numberId);

  return (
    <div className="PageCard">
      {item ? (
        <>
          <div>
            <img src={item.owner.avatar_url} alt="" />
          </div>
          <div>{item.description} </div>
        </>
      ) : (
        <div style={{ color: "rgb(0, 0, 41)" }}>Карточка не найдена</div>
      )}
      <Link to="/" style={{ textDecoration: "none", color: "rgb(0, 0, 41)" }}>
        <div className="PageCard__return">Вернуться на главную страницу </div>
      </Link>
    </div>
  );
};

export default PageCard;
