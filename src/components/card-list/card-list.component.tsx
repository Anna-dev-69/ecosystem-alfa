import { Item } from "../../store";
import CardProduct from "../card-product/card-product.component";
import "./card-list.component.scss";

interface ListOfCardsProps {
  showLikedCards: boolean;
  isFiltered: boolean;
  currentItems: Item[];
  like: { [key: number]: boolean };
  handleLikeProduct: (itemId: number) => void;
  filteredItems: Item[];
}

const CardList = (props: ListOfCardsProps) => {
  return (
    <ul className="ListOfCards">
      {(!props.showLikedCards || props.showLikedCards) &&
        (props.isFiltered || !props.isFiltered) &&
        props.currentItems.map((item) => {
          return (
            <li className="ListOfCards__ul-li" key={item.id}>
              <CardProduct
                itemId={item.id}
                imgSrc={item.owner.avatar_url}
                description={item.description}
                like={props.like[item.id] || false}
                onLike={() => props.handleLikeProduct(item.id)}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default CardList;
