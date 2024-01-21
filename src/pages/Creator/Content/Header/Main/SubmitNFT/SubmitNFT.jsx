import classNames from "classnames/bind";
import Button from "~/components/Button";
import Image from "~/components/Image";
import Title from "~/components/Title";
import styles from "./SubmitNFT.module.sass";
const cx = classNames.bind(styles);
const SubmitNFT = () => {
  const items = [
    {
      id: 2,
      data: [
        {
          name: "name",
          value: "Robot wombats",
        },
        {
          name: "symbol",
          value: "robotwombats",
        },
      ],
    },
    {
      id: 2,
      data: [
        {
          name: "total supply",
          value: "10000",
        },
        {
          name: "description",
          value: "This is a collection of 10000 and can be used",
        },
        {
          name: "categories primary",
          value: "games",
        },
        {
          name: "categories secondary",
          value: "virtual_worlds",
        },
      ],
    },
    {
      id: 3,
      data: [
        {
          name: "collection pfp",
          url: "https://img-cdn.magiceden.dev/rs:fit:400:0:0/plain/https%3A%2F%2Frenderer.magiceden.dev%2Fv2%2Frender%3Fid%3De151d62f71ab4e9cfbe1a6ab368db482a393e2a01627b2f9c0e99106cd54cba5i49",
          type: "image",
        },
      ],
    },
    {
      id: 4,
      data: [
        {
          name: "twitter",
          url: "https://www.googleapis.com/",
          type: "link",
        },
        {
          name: "discord",
          url: "https://www.googleapis.com/",
          type: "link",
        },
        {
          name: "website",
          url: "https://www.googleapis.com/",
          type: "link",
        },
      ],
    },
    {
      id: 5,
      data: [
        {
          name: "mint date",
          value: "March 17, 2024 9:00 PM GMT ( GMT )",
        },
      ],
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <Title gallery title="The last step" large nowrap={false} />
      <Title title="Review & Submit" white nowrap={false} fontBold extraLarge6 />
      <Title gallery title="You are ready to submit your listing application. Please  review the details below and confirm it is connect. Click submit when you are ready to submit." fontMedium xl nowrap={false} />

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <div className={cx("container")}>
          {items.map((item, index) => (
            <div key={index} className={cx("containerData")}>
              {item?.data.map((x, index) => (
                <div key={index} className={cx("containerItem")}>
                  <div className={cx("nameItem")}>{x?.name}:</div>
                  {x?.value && <div className={cx("valueItem")}>{x?.value}</div>}
                  {x?.url && x?.type === "image" && (
                    <div className={cx("containerImage")}>
                      <Image src={x?.url} className={cx("image")} />
                    </div>
                  )}
                  {x?.url && x?.type === "link" && <div className={cx("linkValue")}>{x?.url}</div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={`${cx("mb")}`}>
        <Button title="Submit" className={cx("buttonSubmit")} />
      </div>
    </div>
  );
};

export default SubmitNFT;
