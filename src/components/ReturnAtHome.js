import Button from "./Button";

export function ReturnAtHome({ onReset }) {
  return (
    <Button classStyle="return-at-home-button" callback={onReset}>
      Return at home
    </Button>
  );
}
