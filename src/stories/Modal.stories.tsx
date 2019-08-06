import React from "react";
import { storiesOf } from "@storybook/react";
import Modal from "../components/presentation/Modal";

storiesOf("Modal", module).add("Default", () => <Modal open={true} />);
