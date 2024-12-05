import { useState, useEffect } from "react";
import axios from "axios";
import { TPcomment } from "../types/comment";

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState<TPcomment[]>([]);
  const [commentxs, setCommentxs] = useState<TPcomment[]>([]);
  const [loading, setLoading] = useState(false);

  const createComment = async (newComment) => {
    console.log(newComment)
    try {
        setLoading(true);
        const response = await axios.post('/api/comments', newComment); 
        setComments(response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response?.data);
        } else {
            console.error('Error:', error.message);
        }
    } finally {
        setLoading(false);
    }};

    const getComments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/comments`); 
            
            const data = response.data;
            console.log('Fetched data:', data);
            setCommentxs(data.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setLoading(false);
        }};

    const getCommentByProductId = async (id:string) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/comments/${id}`); 
            setComment(response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setLoading(false);
        }};

        const updateComment = async (commentId: string, updatedData: Partial<TPcomment>) => {
            try {
              setLoading(true);
              const response = await axios.put(`/api/comments/${commentId}`, updatedData);
              const updatedComment = response.data.updatedComment;
              setCommentxs((prevComments) =>
                prevComments.map((comment) =>
                  comment._id === commentId ? { ...comment, ...updatedComment } : comment
                )
              );
        
              return response.data;
            } catch (error) {
              if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
              } else {
                console.error('Error:', error.message);
              }
              throw error;
            } finally {
              setLoading(false);
            }
          };

        useEffect(()=>{
            getComments();
        },[])

  return { comments,createComment,comment,getCommentByProductId,commentxs,updateComment };
};

export default useComments;
