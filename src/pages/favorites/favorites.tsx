import { Helmet } from 'react-helmet-async';
import { Offers } from '../../types/offers';
import OfferCardFavorites from '../../components/offer-card-favorites/offer-card-favorites';
import Header from '../../components/header/header';

type FavoritesProps = {
  offers: Offers;
};

const Favorites = ({ offers }: FavoritesProps) => (
  <div className="page">
    <Header />
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <Helmet>
            <title>6 cities. Favorites</title>
          </Helmet>
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Amsterdam</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {offers.map((offer) => (
                  <OfferCardFavorites offer={offer} key={offer.id} />
                ))}
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
    <footer className="footer container">
      <a className="footer__logo-link" href="main.html">
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={64}
          height={33}
        />
      </a>
    </footer>
  </div>
);

export default Favorites;
