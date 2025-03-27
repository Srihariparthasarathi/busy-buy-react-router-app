import useHomeState from "../hooks/useHomeState.hooks";

import ShoppingItem from "../components/Item.Component";
import Loading from "../components/Loading.component";

const Home = () => {
    const { isLogin, items, isLoding, searchRef, handleSearchChange } = useHomeState();

    return (
        <div className="home">
            <div className="filter-container"></div>
            <section className="main-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search product..."
                        onChange={handleSearchChange}
                        ref={searchRef}
                    />
                </div>

                {isLoding ? <Loading />
                 : (
                    <section className="items-container">
                        {items.length > 0 ? (
                            items.map(item => (
                                <ShoppingItem
                                    itemDetail={item}
                                    key={item.id}
                                    isLogin={isLogin}
                                />
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </section>
                )}
            </section>
        </div>
    );
};

export default Home;
