import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import transactionsService from "../../../services/transactions.service";
import { useCheckAuth } from "../../../hooks/auth/useCheckAuth";
import { ITransactionResponse } from "../../../models/responses/TransactionResponse";
import { Box, List, ListItem } from "@mui/material";
import cx from "classnames";
import { Button } from "../button";

export const Notifications = () => {
  const [requests, setRequests] = useState<Array<ITransactionResponse>>([]);
  const [responses, setResponses] = useState<Array<ITransactionResponse>>([]);
  const { user } = useCheckAuth();

  useEffect(() => {
    const load = async () => {
      if (user) {
        const id = "company_id" in user ? user.company_id : user.user_id;
        const transactions1 = await transactionsService.getTransactionsByDonor(
          id
        );
        const transactions2 =
          await transactionsService.getTransactionsByRecipient(id);
        setResponses(transactions2);
        setRequests(transactions1);
      }
    };

    load();
  }, [user]);
  return (
    <div className={styles.notifications}>
      <span className={styles.title}>Դիումներ</span>
      <List className={styles.list}>
        {requests
          .filter((item) => item.status === "in_progress")
          .map((item) => (
            <ListItem className={styles.item} key={item.transaction_id}>
              <Box className={styles.info}>
                <a href={`/items/${item.item_id}`}>{item.item_id}</a>
                <span>{new Date(item.created_at).toLocaleString()}</span>
              </Box>
              <Box className={styles.buttons}>
                <Button
                  onClick={() => {
                    transactionsService.updateTransactionStatus(
                      item.transaction_id,
                      "completed"
                    );
                  }}
                >
                  Հաստատել
                </Button>
                <Button
                  onClick={() => {
                    transactionsService.updateTransactionStatus(
                      item.transaction_id,
                      "cancelled"
                    );
                  }}
                >
                  Մերժել
                </Button>
              </Box>
            </ListItem>
          ))}
      </List>
      <span className={styles.title}>Պատասխաններ</span>
      <List className={styles.list}>
        {responses
          .filter((item) => item.status !== "in_progress")
          .map((item) => (
            <ListItem
              className={cx(styles.item, styles[item.status])}
              key={item.transaction_id}
            >
              <Box className={styles.info}>
                <a href={`/products/${item.item_id}`}>{item.item_id}</a>
                <span>{new Date(item.created_at).toLocaleString()}</span>
              </Box>
              <img
                onClick={() => {
                  transactionsService.removeTransaction(item.transaction_id);
                }}
                className={styles.close}
                src="icons/close.svg"
                width={40}
                height={40}
                alt="close"
              />
            </ListItem>
          ))}
      </List>
    </div>
  );
};
