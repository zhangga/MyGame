package p.my.login.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import p.my.login.bean.Channel;

public interface ChannelMapper {
	
	@Select("select * from channel")
	public List<Channel> getAllChannel();

}
