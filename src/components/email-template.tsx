import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface EmailTemplateProps {
  message: string;
  senderEmail: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  message,
  senderEmail,
}) => (
  <Html>
    <Head />
    <Preview>New Message submitted from GCWiki</Preview>
    <Tailwind>
      <Body>
        <Container>
          <Section>
            <Heading>
              You have received the following message from the contact form
            </Heading>
            <Text>{message}</Text>
            <Hr />
            <Text>The sender email is: {senderEmail}</Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default EmailTemplate;
