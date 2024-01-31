import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getAllCategory } from "~/api/Category";
import Select from "~/components/Select";
import Title from "~/components/Title";
import styles from "./Category.module.sass";
const cx = classNames.bind(styles);
const Category = ({ primaryCategories, setPrimaryCategories, secondaryCategories, setSecondaryCategories }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getAllCategory();
        const updateCategory = [{ value: "", name: "-" }];
        results.listResult.forEach((category) => {
          updateCategory.push({ value: category.id, name: category.name });
        });
        setCategories(updateCategory);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSelectPrimaryCategory = (value) => {
    setPrimaryCategories(value);
  };

  const handleSelectSecondaryCategory = (value) => {
    setSecondaryCategories(value);
  };

  return (
    <div className={cx("contentCategory")}>
      <Title title="Categories" white nowrap={false} fontBold xxxl />
      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="Primary Category" gallery xl fontMedium nowrap={false} />
        <Select translate placement="auto" data={categories} disableValue={secondaryCategories} value={primaryCategories} onChange={handleSelectPrimaryCategory} />
        <Title title="Select the primary category that you would like for this collection to be listed under" nowrap={false} gallery xl fontMedium />
      </div>

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="Secondary Category" gallery xl fontMedium nowrap={false} />
        <Select translate placement="auto" data={categories} value={secondaryCategories} disableValue={primaryCategories} onChange={handleSelectSecondaryCategory} />
        <Title title="Select the  secondary category for this collection to be listed under" nowrap={false} gallery xl fontMedium />
      </div>
    </div>
  );
};
Category.propTypes = {
  primaryCategories: PropTypes.string.isRequired,
  setPrimaryCategories: PropTypes.func.isRequired,
  secondaryCategories: PropTypes.string.isRequired,
  setSecondaryCategories: PropTypes.func.isRequired,
};

export default Category;
