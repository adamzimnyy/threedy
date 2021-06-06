const styles = {
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
  },
  nameContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  name: {
    margin: 0,
    fontWeight: "bold",
    fontSize: "1.4em",
  },
  statusCircle: {
    width: ".8em",
    height: ".8em",
    borderRadius: "50%",
    boxSizing: "border-box",
    transition: "background-color .2s ease-in-out",
  },
  buttonContainer: {
    width: "2em",
    height: "2em",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    padding: 0,
    margin: 0,
    color: "unset",
    fontSize: "unset",
    lineHeight: "unset",
  },
};

export default styles;
