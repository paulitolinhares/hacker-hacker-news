import { storiesOf } from "@storybook/react";
import React from "react";
import Hello from "../components/presentation/Hello";

storiesOf("Hello world", module).add("Test", () => <Hello>Hello world!</Hello>);
